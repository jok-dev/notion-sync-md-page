import * as fs from 'fs';
import * as core from '@actions/core'
import { Client } from '@notionhq/client'
import {markdownToBlocks} from '@Elioby/martian'

// seriously, typescript??
type BlockObjectRequest = typeof Client.prototype.blocks.children.append.arguments[1];

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token')
    const page: string = core.getInput('page')
    const mdFile: string = core.getInput('mdFile')

    const notion = new Client({ auth: token })
    const mdFileContents: string = fs.readFileSync(mdFile, 'utf8')

    const notionUrlMatch = /[^-]*$/.exec(page)
    if (notionUrlMatch == null) {
      throw new SyntaxError('Provided page was not in a valid format, url must end with "-<page-id>"');
    }

    const notionPageId = notionUrlMatch![0]
    const blocks = markdownToBlocks(mdFileContents, { allowUnsupported: true })
    
    const notionBlocks = <BlockObjectRequest[]> JSON.parse(JSON.stringify(blocks))
    console.log(JSON.stringify(blocks))
    notion.blocks.children.append({ block_id: notionPageId, children: notionBlocks })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
