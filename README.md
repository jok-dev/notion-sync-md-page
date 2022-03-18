# Notion Sync MD Page

This is an action to sync a MD file in your repository with a specified Notion page.

### Example workflow

```yaml
name: My Workflow
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@main
    - name: Run action

      uses: Elioby/notion-sync-md-page@main
      with:
        token: notionapitoken
        page: https://notion.so/linktoyourpage
        mdFile: pathtoyourmdfile
```

### Inputs

| Input    | Description                          |
|----------|--------------------------------------|
| `token`  | The Notion API token                 |
| `page`   | The URL of the Notion page to update |
| `mdFile` | The MD file on disk                  |