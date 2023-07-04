import { renderTemplate } from '../../services';
import template from '../template.html';
import { Router } from 'express';
import { body } from './body';

export const home = Router();

home.get('/', (req, res) => {
  const page = renderTemplate(template, {
    title: `jackbliss.co.uk`,
    body: '<div id="react-root"></div>',
    scripts: '<script src="/bundles/conversations.js"></script>',
    styles: '<link href="/bundles/conversations.css" rel="stylesheet" />',
  });
  res.type('text/html').send(page);
});
