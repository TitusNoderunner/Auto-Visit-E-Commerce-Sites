// ==UserScript==
// @name         Modified E-commerce Script - 3DOS Network
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Automates visiting e-commerce sites and clicking buttons, with referral code check.
// @author       Titus
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const domains = [
        "https://www.amazon.com",
        "https://www.ebay.com",
       "https://www.amazon.com",
    "https://www.ebay.com",
    "https://www.walmart.com",
    "https://amazon.com",
    "https://global.jd.com",
    "https://rakuten.co.jp",
    "https://mercadolibre.com",
    "https://allegro.pl",
    "https://pinduoduo.com",
    "https://tokopedia.com",
    "https://hepsiburada.com",
    "https://jumia.com",
    "https://amazon.fr",
    "https://alibaba.com",
    "https://thomasnet.com",
    "https://tradeindia.com",
    "https://kompass.com",
    "https://exporthub.com",
    "https://industrystock.com",
    "https://manufacturers.com.tw",
    "https://temu.com",
    "https://rakuten.co.jp",
    "https://kijiji.ca",
    "https://argos.co.uk",
    "https://fnac.com",
    "https://gmarket.co.kr",
    "https://jumia.com.ng",
    "https://bidorbuy.co.za",
    "https://olx.pl",
    "https://shopee.sg",
    "https://themarket.com",
    "https://globaledge.msu.edu",
    "https://3dnatives.com",
    "https://additivemanufacturing.media",
    "https://xometry.com",
    "https://geomiq.com",
    "https://uptivemfg.com",
    "https://business.amazon.com",
    "https://turkishexporter.com.tr",
    "https://sayellow.com",
    "https://amazon.it",
    "https://taobao.com",
    "https://ebay.com",
    "https://walmart.com",
    "https://flipkart.com",
    "https://coupang.com",
    "https://bol.com",
    "https://onbuy.com",
    "https://trendyol.com",
    "https://amazon.co.uk",
    "https://amazon.in",
    "https://globalsources.com",
    "https://indiamart.com",
    "https://dhgate.com",
    "https://europages.com",
    "https://afrindex.com",
    "https://taiwantrade.com",
    "https://globalspec.com",
    "https://amazon.co.jp",
    "https://shopee.com",
    "https://bestbuy.ca",
    "https://mercadolivre.com.br",
    "https://otto.de",
    "https://snapdeal.com",
    "https://catch.com.au",
    "https://konga.com",
    "https://noon.com",
    "https://lazada.com.my",
    "https://lazada.sg",
    "https://worldofmanufacturers.com",
    "https://voxelmatters.directory",
    "https://lusha.com",
    "https://us.metoree.com",
    "https://hubs.com",
    "https://sunpe.com",
    "https://firstmold.com",
    "https://eworldtrade.com",
    "https://b2brazil.com",
    "https://vietnammanufacturers.com",
    "https://vconnect.com",
    "https://amazon.es",
    "https://tmall.com",
    "https://aliexpress.com",
    "https://shopee.com",
    "https://etsy.com",
    "https://lazada.com",
    "https://zalando.com",
    "https://newegg.com",
    "https://cdiscount.com",
    "https://amazon.de",
    "https://amazon.com.au",
    "https://made-in-china.com",
    "https://ec21.com",
    "https://ecplaza.net",
    "https://tradekey.com",
    "https://mfg.com",
    "https://made-in-africa.com",
    "https://hktdc.com",
    "https://walmart.com",
    "https://amazon.ca",
    "https://mercadolibre.com.mx",
    "https://americanas.com.br",
    "https://zalando.de",
    "https://shopping.yahoo.co.jp",
    "https://kogan.com.au",
    "https://takealot.com",
    "https://lazada.co.id",
    "https://shopee.com.my",
    "https://trademe.co.nz",
    "https://panjiva.com",
    "https://sewport.com",
    "https://protolabs.com",
    "https://rapiddirect.com",
    "https://yijinsolution.com",
    "https://be-cu.com",
    "https://all.biz",
    "https://thaitrade.com",
    "https://ralali.com",
    "https://amazon.nl",
    "https://amazon.se",
    "https://amazon.cn",
    "https://amazon.ae",
    "https://ebay.ca",
    "https://ebay.ie",
    "https://ebay.com.cn",
    "https://ebay.com.my",
    "https://tw.ebay.com",
    "https://mercadolibre.com.ar",
    "https://amazon.pl",
    "https://amazon.sg",
    "https://amazon.sa",
    "https://ebay.at",
    "https://ebay.nl",
    "https://ebay.com.hk",
    "https://ebay.ph",
    "https://ebay.co.th",
    "https://mercadolibre.com.co",
    "https://amazon.com.be",
    "https://amazon.com.tr",
    "https://amazon.eg",
    "https://ebay.be",
    "https://ebay.ch",
    "https://ebay.in",
    "https://tradera.com",
    "https://ebay.vn"
    ];

    // Process domains and remove duplicates
    const domainsWithoutWWW = [...new Set(domains.map(d => d.replace('www.', '')))];
    const DURATION = 30000; // 30 seconds
    const LOAD_TIMEOUT = 15000; // 15 seconds to detect failed pages

    const correctReferralCode = "62321c";
    const correctUrl = `https://dashboard.3dos.io/register?ref_code=${correctReferralCode}`;
    const currentUrl = window.location.href;

   // Storage functions
    const getIndex = () => Number(GM_getValue('currentIndex', 0));
    const setIndex = (val) => GM_setValue('currentIndex', val % domainsWithoutWWW.length);

    // Stop if on dashboard
    if (location.href.includes('3dos.io/')) {
        console.log('Stopped on dashboard');
        return;
    }

   // Notification system
    GM_addStyle(`
        .visit-notification {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: #fff;
            padding: 30px;
            border-radius: 20px;
            font-size: 2.5em;
            text-align: center;
            z-index: 99999;
            box-shadow: 0 0 20px rgba(0,255,0,0.5);
            min-width: 600px;
            border: 3px solid #4CAF50;
        }
        .countdown {
            font-size: 0.8em;
            color: #4CAF50;
            margin-top: 15px;
        }
        .error-notification {
            border-color: #ff4444;
            box-shadow: 0 0 20px rgba(255,68,68,0.5);
        }
    `);

    let pageLoaded = false;
    let currentNotification = null;

    function createNotification(isError = false) {
        if (currentNotification) currentNotification.remove();

        const notification = document.createElement('div');
        notification.className = `visit-notification ${isError ? 'error-notification' : ''}`;

        notification.innerHTML = `
            <div>${isError ? '❌ Connection Error' : '🛒 Visiting E-commerce Site'}</div>
            <div style="font-size:0.6em; margin:15px 0">${location.href}</div>
            <div class="countdown">Next attempt in: <span id="count">${isError ? 5 : 30}</span>s</div>
            <div>STAY ON THIS TAB TO ACTIVATE BONUS BY VISITING WHITELIST E-COMMERCE SITE</div>
        `;

        document.body.appendChild(notification);
        currentNotification = notification;
        return notification;
    }

    function proceedToNextDomain() {
        const nextIndex = (getIndex() + 1) % domainsWithoutWWW.length;
        setIndex(nextIndex);
        window.location.href = domainsWithoutWWW[nextIndex];
    }

    // Main error handling logic
    const loadTimeout = setTimeout(() => {
        if (!pageLoaded) {
            createNotification(true);
            setTimeout(proceedToNextDomain, 5000);
        }
    }, LOAD_TIMEOUT);

    window.addEventListener('load', () => {
        pageLoaded = true;
        clearTimeout(loadTimeout);
        const notification = createNotification();
        let secondsLeft = 30;
        const countElement = notification.querySelector('#count');

        const timer = setInterval(() => {
            secondsLeft--;
            countElement.textContent = secondsLeft;
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            proceedToNextDomain();
        }, DURATION);
    });

    window.addEventListener('error', (event) => {
        if (!pageLoaded) {
            clearTimeout(loadTimeout);
            createNotification(true);
            setTimeout(proceedToNextDomain, 5000);
        }
    });
})();
