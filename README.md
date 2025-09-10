# forgejo-CheckLabels

A Github Action to check if labels are present on an issue or PR.

## Usage/Examples

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Extract labels  #optional
        run: |
          echo "PRESENT_LABELS=$(echo '${{ toJson(github) }}' | jq -r '[.event.issue.labels[].name] | join(",")')" >> $GITHUB_ENV

      - name: Run Forgejo API Action
        uses: timherrm/forgejo-CheckLabels@v1
        with:
          check_labels: "label1,label2,label3"
          present_labels: ${{ env.PRESENT_LABELS }} #or just "label1,label2,label4" 
          operator: "and"
          #debug: true                              #optional
  job2:
    needs: job1
    runs-on: ubuntu-latest
    steps:
      - run: echo "✅ Pipeline runs because labels matched"

```

## Inputs/Outputs

see [action.yml](action.yml)

## Local testing with act

Clone the project

```bash
  git clone https://github.com/timherrm/forgejo-CheckLabels
```

Go to the project directory

```bash
  cd forgejo-CheckLabels
```

Run

```bash
  brew install act node
  npm install @actions/core @vercel/ncc
  npm init -y
  ncc build src/main.js -o dist
  act
```

## Authors

- [@timherrm](https://www.github.com/timherrm)
