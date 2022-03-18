import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token')
    const page: string = core.getInput('page')
    const mdFile: string = core.getInput('mdFile')

    
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
