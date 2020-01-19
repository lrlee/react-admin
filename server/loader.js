import React from 'react'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Frontload, frontloadServerRender } from 'react-frontload';
import Loadable from 'react-loadable';
import path from 'path'
import Routes,{ router } from '@/router'
import fs from 'fs'
import qs from 'qs'
import createStore from '@/store';
console.log(333)
const template = fs.readFileSync(
    path.join(__dirname, '../build/index.html'),
    'utf8'
  );
export default async(req,res,next)=>{
    console.log(req.url,"reqUrl")
    if (req.url.startsWith('/static/') || req.url.startsWith('/favicon.ico')) {
        return next();
    }
    const { store } = createStore(req.url);
    const branch = matchRoutes(router, req._parsedUrl.pathname);
    console.log(branch,"branch")
    let matchTemp = null
    branch.map(({route,match})=>{
        matchTemp = {...match,...{query:qs.parse(req._parsedUrl.query)}}
    })
    let clientHtml = '';
    const promises = branch.map(async ({ route, match }) => {
        const component = await route.component.preload();
        const prefetch = component.default.prefetch;
        return prefetch instanceof Function
          ? prefetch(store, matchTemp)
          : Promise.resolve(null);
    });
    console.log(matchTemp,"matchTemp")
    
    await Promise.all(promises).catch(err => console.log(err));
    clientHtml = await frontloadServerRender(() =>
        renderToString(
            <Loadable.Capture report={m => modules.push(m)}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                    <Frontload isServer={true}>
                        <Routes />
                    </Frontload>
                    </StaticRouter>
                </Provider>
            </Loadable.Capture>
        )
    );
    const state = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const reduxState = `<script>window.__INITIAL_DATA__ = ${state}</script>`;
    let pageString = template
    // .replace('{title}', toTitleSymbolRegExp(title))
    // .replace('{keywords}', keywords)
    // .replace('{description}', description)
    // .replace('{articleinfo}', JSON.stringify(articleInfo))
    // .replace('<!-- style -->', styles)
    .replace('<!-- stark -->', clientHtml)
    // .replace('<!-- state -->', reduxState);
    // pageCache.set(req._parsedUrl.href, pageString);
    res.send(pageString);
}