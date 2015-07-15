$.mockjax({
    url: "/items",
    proxyType: "get",
    proxy: "/mocks/responses/items-get.json"
});

$.mockjax({
    url: "/items",
    proxyType: "put",
    proxy: "/mocks/responses/items-get.json"
});

$.mockjax({
    url: "/listings",
    proxyType: "get",
    proxy: "/mocks/responses/listings-get.json"
});



// Disable Mocks
//$.mockjax.clear();