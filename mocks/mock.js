$.mockjax({
    url: "/items",
    proxyType: "get",
    proxy: "/mocks/responses/items-get.json"
});

// Disable Mocks
//$.mockjax.clear();