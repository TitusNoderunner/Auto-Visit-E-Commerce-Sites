// ==UserScript==
// @name         Modified E-commerce Script - 3DOS Network
// @namespace    http://tampermonkey.net/
// @version      0.1
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
        "https://solostocks.com.mx",
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
        "https://tiu.ru",
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
    const domainsWithoutWWW = domains.map(domain => domain.replace('www.', ''));
    const correctReferralCode = "62321c";
    const correctUrl = "https://dashboard.3dos.io/register?ref_code=" + correctReferralCode;
    const currentUrl = window.location.href;

    // Use GM_getValue if available, otherwise use localStorage
    function getStorageValue(key, defaultValue) {
        if (typeof GM_getValue === 'function') {
            return GM_getValue(key, defaultValue);
        } else {
            return localStorage.getItem(key) || defaultValue;
        }
    }

    // Use GM_setValue if available, otherwise use localStorage
    function setStorageValue(key, value) {
        if (typeof GM_setValue === 'function') {
            GM_setValue(key, value);
        } else {
            localStorage.setItem(key, value);
        }
    }

    // Get current index or start at 0
    let currentIndex = Number(getStorageValue('currentIndex', 0));

    // Remove www. for matching
    const currentUrlWithoutWWW = currentUrl.replace('www.', '');

    // Check if the current URL is the correct registration URL or if the user is already on the dashboard
    if (currentUrl === correctUrl || currentUrl.includes('https://dashboard.3dos.io/')) {
        console.log("Script is running on the correct URL or user is already logged in.");
    }

    if(domainsWithoutWWW.some(domain => currentUrlWithoutWWW.startsWith(domain))) {
        // If on target site, wait 10 seconds then move to next
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % domainsWithoutWWW.length;
            setStorageValue('currentIndex', currentIndex);
            window.location.href = domainsWithoutWWW[currentIndex];
        }, 10000);
    }
    else {
        // If not on target site, go to current index immediately
        window.location.href = domainsWithoutWWW[currentIndex];
    }

    // Add custom CSS for notifications
    GM_addStyle(`
        .visit-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            max-width: 300px;
            font-family: Arial, sans-serif;
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `);

    // Notification system
    function showSuccessMessage(url) {
        const notification = document.createElement('div');
        notification.className = 'visit-notification';
        notification.innerHTML = `
            <strong>✓ Successfully Visited</strong><br>
            ${url}
        `;

        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

   if(domainsWithoutWWW.some(domain => currentUrlWithoutWWW.startsWith(domain))) {
        // Show success notification
        showSuccessMessage(window.location.href);

        // Wait 10 seconds then move to next
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % domainsWithoutWWW.length;
            setStorageValue('currentIndex', currentIndex);
            window.location.href = domainsWithoutWWW[currentIndex];
        }, 10000);
    }
    else {
        // If not on target site, go to current index immediately
        window.location.href = domainsWithoutWWW[currentIndex];
    }
})();
