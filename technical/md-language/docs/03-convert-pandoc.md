# Pandoc capabilities

> Pandoc is a universally file converter, open-source, that accepts a variety of input and output file formats.

There are several markdown flavours derived from the original Markdown syntax. One of them is the **Github's flavour**.
As an example, to convert one GitHub's flavour markdown file format to djot, you use `djot` and pandoc.

Implementation is in `Javascript`, `Rust`, `Go`, `PHP`

## Converting from pandoc to djot

```bash
pandoc mydoc.md -f gfm -t json | djot -f pandoc -t djot > mydoc.dj
```

What is it happening here? you are using pandoc to transform a `mydoc.md` with format -f `gfm` (GitHub Flavoured Markdown) to (-t) `json` (pandoc). Then, you pipe (|) the result using `djot` from format `pandoc` to -t `djot` and append it to `mydoc.dj`

## Converting from djot to any supported file in pandoc

```bash
djot -t pandoc mydoc.dj | pandoc -f json -s -t docx -o mydoc.docx
```