function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const session = {
    load: function() {
        const sessionCookie = getCookie("session");
        if (!sessionCookie) return false;
        const s = JSON.parse(unescape(sessionCookie));
        for(var k in s) session[k]=s[k];
        return true;
    },
    save: function(s, expires) {
        // 2038-01-19 is the maximum cookie lifetime
        // https://stackoverflow.com/questions/532635/javascript-cookie-with-no-expiration-date
        const d = expires || new Date(2038, 1, 19);
        document.cookie = `session=${escape(JSON.stringify(s))};path=/;expires=${d.toUTCString}`;
        session.load();
    },
    delete: function() {
        deleteCookie("session");
    },
    exists: function() {
        return !!getCookie("session");
    }
}

export default session;
