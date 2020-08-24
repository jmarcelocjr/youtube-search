chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "default",
        title: chrome.i18n.getMessage('default_menu'),
        type: 'normal',
        contexts: ['selection'],
    });

    chrome.contextMenus.create({
        id: "edit",
        title: chrome.i18n.getMessage('edit_menu'),
        type: 'normal',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {
    let selectedText = item.selectionText;

    if (item.menuItemId == 'edit') {
        selectedText = prompt(chrome.i18n.getMessage('prompt_message'), selectedText);
        if (selectedText == null) {
            return;
        }
    }

    let url = 'https://'+ chrome.i18n.getMessage('url') +'/search?q=' + encodeURIComponent(selectedText);
    chrome.tabs.create({url: url, index: tab.index + 1});
});
