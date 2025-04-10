// ==UserScript==
// @name         Reddit Unddit Undelete
// @namespace    https://github.com/nazdridoy
// @version      1.7.0
// @description  Adds an "Unddit" button to Reddit's navigation bar that lets you quickly view deleted and removed comments/posts on undelete.pullpush.io with one click. Recover deleted Reddit content easily.
// @author       nazdridoy
// @license      MIT
// @match        https://www.reddit.com/*
// @icon         https://undelete.pullpush.io/images/favicon.ico
// @grant        GM_addElement
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-body
// @homepageURL  https://github.com/nazdridoy/Reddit-Unddit-Undelete
// @supportURL   https://github.com/nazdridoy/Reddit-Unddit-Undelete/issues
// ==/UserScript==

/* 
MIT License

Copyright (c) 2023 nazDridoy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function () {
    'use strict';

    console.log('[Unddit Redirect] Script started!');

    // Reddit Unddit Undelete - Easily view deleted comments and posts on Reddit
    // This script helps users recover deleted content from Reddit by adding a convenient button
    // to the UI that redirects to undelete.pullpush.io (formerly known as unddit)

    // Observer to watch DOM for dynamic changes
    const observer = new MutationObserver(() => {
        if (!document.getElementById('unddit-button')) {
            addRedirectButton();
        }
    });

    // Function to create and add the button to Reddit's navigation
    function addRedirectButton() {
        const headerNav = document.querySelector('header.v2 > nav'); // Reddit's main navigation bar
        if (!headerNav) {
            console.log('[Unddit Redirect] Navigation bar not found.');
            return;
        }

        // Create the Unddit button for quick access to deleted content
        const button = GM_addElement(headerNav, 'div', {
            id: 'unddit-button',
            class: 'unddit-button',
            textContent: 'Unddit',
            title: 'View deleted comments and posts on undelete.pullpush.io',
        });

        // Style the button to be visible and match Reddit's design
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#ff4500'; // Reddit orange
        button.style.color = '#fff';
        button.style.padding = '5px 10px';
        button.style.margin = '5px';
        button.style.borderRadius = '5px';
        button.style.fontSize = '14px';
        button.style.fontWeight = 'bold';

        // Click event to redirect to undelete.pullpush.io to see deleted content
        button.addEventListener('click', () => {
            const currentUrl = window.location.href;
            const newUrl = currentUrl.replace('https://www.reddit.com', 'https://undelete.pullpush.io');
            console.log('[Unddit Redirect] Redirecting to:', newUrl);
            window.location.href = newUrl;
        });

        console.log('[Unddit Redirect] Button added:', button);
    }

    // Start observing the DOM for changes to ensure button appears even with dynamic page loading
    observer.observe(document, {
        childList: true,
        subtree: true,
    });

    // Add the button immediately in case the nav bar is already loaded
    addRedirectButton();

    // Cleanup observer if Reddit's app structure isn't detected
    setTimeout(() => {
        const isRedditApp = document.querySelector('header.v2');
        if (!isRedditApp) {
            observer.disconnect();
            console.log('[Unddit Redirect] Stopped observing: Reddit app not detected.');
        }
    }, 8000);
})();