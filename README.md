# Notion Sync MD Page

This is an action to sync a MD file in your repository with a specified Notion page. Useful if you want to share repoistory documentation with non-developers.

### Example workflow

```yaml
name: My Workflow
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@main
    - name: Sync README to Notion
      uses: Elioby/notion-sync-md-page@main
      with:
        token: notionapitoken
        page: https://notion.so/linktoyourpage
        mdFile: README.md
```

### Inputs

| Input    | Description                                                                                                                                   |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `token`  | The Notion API token, note this has to be a Notion integration token, not a user token. See: https://developers.notion.com/docs/authorization |
| `page`   | The URL of the Notion page to update                                                                                                          |
| `mdFile` | The MD file on disk                                                                                                                           |
