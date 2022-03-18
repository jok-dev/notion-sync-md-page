import * as fs from 'fs';
import * as core from '@actions/core'
import { Client } from '@notionhq/client'
import {markdownToBlocks} from '@Elioby/martian'
import { REPL_MODE_SLOPPY } from 'repl';

// seriously, typescript??
type BlockObjectRequest = typeof Client.prototype.blocks.children.append.arguments[1];

let notion: Client

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token')
    const page: string = core.getInput('page')
    const mdFile: string = core.getInput('mdFile')

    notion = new Client({ auth: token })
    
    const mdFileContents: string = fs.readFileSync(mdFile, 'utf8')

    const notionUrlMatch = /[^-]*$/.exec(page)
    if (notionUrlMatch == null) {
      throw new SyntaxError('Provided page was not in a valid format, url must end with "-<page-id>"');
    }

    const notionPageId = notionUrlMatch![0]

    // delete any existing blocks on the page
    deleteAllChildren(notionPageId)

    const blocks = markdownToBlocks(mdFileContents, { allowUnsupported: true })
    const notionBlocks = <BlockObjectRequest[]> JSON.parse(JSON.stringify(blocks))
    notion.blocks.children.append({ block_id: notionPageId, children: notionBlocks })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function deleteAllChildren(blockId: string, startCursor: string | undefined = undefined) {
  const request = notion.blocks.children.list({ block_id: blockId, start_cursor: startCursor, page_size: 100 })
  let response = await request
  do {
    for (let block of response.results) {
      notion.blocks.delete({ block_id: block.id })
    }

    if (response.next_cursor) {
      deleteAllChildren(blockId, response.next_cursor);
    }
  } while (response.next_cursor);
}

run()
