/* eslint-disable max-lines-per-function */
const fs = require('fs');
const path = require('path');

const liquidFilePath = path.resolve(__dirname, 'layout/theme.liquid');
const cssFilePath = path.resolve(__dirname, 'assets/critical.css');

const minifyCss = (content) => content.replace(/\s+/g, ' ');

const addCssToHtml = async () => {
  const htmlContent = await fs.promises.readFile(liquidFilePath, 'utf-8');
  const cssContent = await fs.promises.readFile(cssFilePath, 'utf-8');
  let modifiedHtmlContent = '';

  const minifiedCss = minifyCss(cssContent);

  if (htmlContent.includes("</style>")) {
    const styleTagContent = /(<style>)(.*)(<\/style>)/g;
    modifiedHtmlContent = htmlContent.replace(styleTagContent, `<style>${minifiedCss}</style>`);
  } else {
    modifiedHtmlContent = htmlContent.replace(
      /<title>/i,
      `  <style>${minifiedCss}</style>
      <title>`,
    );
  }

  fs.writeFile(liquidFilePath, modifiedHtmlContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Successfully updated ${liquidFilePath} with ${cssFilePath}`);
    }
  });

};

addCssToHtml();