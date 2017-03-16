$(document).ready(function() {
        $.ajax({
            url: "/atom.xml",
            dataType: "xml",
            success: function(xmlResponse) {
                var data = $("entry", xmlResponse).map(function() {
                    return {
                        value: $("title", this).text(),
                        url: $("id", this).text()
                    };
                }).get();
                $("#search").autocomplete(data, {
                    minChars: 1,
                    autoFill: false,
                    mustMatch: false,
                    matchContains: true,
                    scrollHeight: 200,
                    formatItem: function(item) {
                        return item.value;
                    },
                }).result(function(event, item) {
                    location.href = item.url;
                });
                $('#search').bind("input.autocomplete", function() {
                    $(this).trigger('keydown.autocomplete');
                });
            }
        });  
});