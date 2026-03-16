let CONFIG = {
    hostname: process.env.BAACK_HOSTNAME,
    api_key: process.env.BAACK_API_BEARER
}

let entity = undefined;

async function fetchOwnerCompany() {
    const url = CONFIG.hostname  + '/n/v1/companies';
    const result = await fetchJson(url, {});
    if (undefined === result) {
        return undefined;
    }
    if (undefined === result.companies) {
        return undefined;
    }
    for (const company of result.companies) {
        if (company.organisation) {
            return company;
        }
    }
    return undefined;
}

async function readEntityView(path, options =
    {
        'Accept-Language': 'en-GB',
        'Variant' : ''
    }) {
    const url = CONFIG.hostname + '/v/v1/entityview' + path;
    return fetchJson(url, options);
}


async function fetchJson(url, headers, method = 'GET', bodyObject = undefined, errorHandler = null) {
    try {
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = 'Bearer ' + CONFIG.api_key;
        const response = await fetch(url,
            {
                method: method,
                headers: headers,
                body: bodyObject? JSON.stringify(bodyObject) : null
            });
        return await response.json();
    } catch (error) {
        if (errorHandler) {errorHandler(error);}
        return undefined;
    }
}

function entityContext(use) {
    entity = use;
}

function textValue(name, order = 0, from = entity) {
    return item(name, order, from?.texts)?.value ?? '';
}

function textItem(name, order = 0, from = entity) {
    return item(name, order, from?.texts);
}

function markdownValue(name, order = 0, from = entity) {
    return item(name, order, from?.markdowns)?.value ?? '';
}

function markdownItem(name, order = 0, from = entity) {
    return item(name, order, from?.markdowns);
}

/**
 * Short alias function for template value accessor function
 * @param name of the template item
 * @param order (number of the template item)
 * @param from entity or defaults to the current entity
 * @returns {*|string}
 */
function templateValue(name, order = 0, from = entity) {
    return item(name, order, from?.templates)?.value ?? '';
}

/**
 * Accessor for template item
 * @param name of the item
 * @param order (number of the template item)
 * @param from entity or defaults to the current entity
 * @returns {*|undefined}
 */
function templateItem(name, order = 0, from = entity) {
    return item(name, order, from?.templates);
}

function dateTimeValue(name, order = 0, from = entity) {
    return item(name, order, from?.dateTimes)?.value ?? '';
}

function dateTimeItem(name, order = 0, from = entity) {
    return item(name, order, from?.dateTimes);
}

function doubleValue(name, order = 0, from = entity) {
    return item(name, order, from?.doubles)?.value ?? '';
}

function doubleItem(name, order = 0, from = entity) {
    return item(name, order, from?.doubles);
}

function booleanValue(name, order = 0, from = entity) {
    return item(name, order, from?.booleans)?.value ?? '';
}

function booleanItem(name, order = 0, from = entity) {
    return item(name, order, from?.booleans);
}

function imageItem(name, order = 0, from = entity) {
    return item(name, order, from?.images);
}

function longValue(name, order = 0, from = entity) {
    return item(name, order, from?.longs)?.value ?? '';
}

function longItem(name, order = 0, from = entity) {
    return item(name, order, from?.longs);
}

function latitudeValue(name, order = 0, from = entity) {
    return item(name, order, from?.latLongs)?.latitude ?? '';
}

function longitudeValue(name, order = 0, from = entity) {
    return item(name, order, from?.latLongs)?.longitude ?? '';
}

function latLongItem(name, order = 0, from = entity) {
    return item(name, order, from?.latLongs);
}

function item(name, order = 0, items) {
    if (undefined === items) {
        return undefined;
    }
    for (const item of items) {
        if (item.name === name && item.sortOrder === order) {
            return item;
        }
    }
    return undefined;
}

export {
    CONFIG,
    fetchOwnerCompany,
    readEntityView,
    textValue, textItem,
    markdownValue, markdownItem,
    templateValue, templateItem,
    dateTimeValue, dateTimeItem,
    doubleValue, doubleItem,
    booleanValue, booleanItem,
    imageItem,
    longValue, longItem,
    latitudeValue, longitudeValue, latLongItem,
    entityContext,
};