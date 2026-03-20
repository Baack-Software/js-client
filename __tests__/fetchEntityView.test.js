import {
    CONFIG as baackConfig,
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
} from '../src/index.js';


test('Test fetching home page content entity', async () => {
    let entity = await readEntityView('/test');
    expect(entity).toBeDefined();
    expect(entity.name).toBeDefined();
    expect(entity.variant).toEqual('');
    expect(entity.language).toEqual('en-GB');
    entityContext(entity);
    expect(textValue('title')).toBeDefined();
    expect(textValue('title')).not.toEqual('');

});

test('Test fetching fails with invalid API key', async () => {
    let key = baackConfig.api_key;
    baackConfig.api_key = '';
    let entity = await readEntityView('/test');
    baackConfig.api_key = key;
    expect(entity?.apiCode).toEqual('NOT_FOUND');
});

test('Test when entity context not set undefined value is empty', async () => {
   entityContext(undefined);
   // calling t[ext]v[alue] returns empty as no current entity context
    expect(textValue('title')).toEqual('');
});

test('Test reading undefined value returns empty', async () => {
   let entity = await readEntityView('/test');
   entityContext(entity);
   expect(textValue('unknown_value')).toEqual('');
});

test('Test retrieving the full text item from the name', async () => {
    let entity = await readEntityView('/test');
    entityContext(entity);
    expect(textItem('title').name).toEqual('title');
    expect(textItem('title').value).toBeDefined();
    expect(textItem('title').sortOrder).toEqual(0);
});

test('Test retrieving the markdown content from a page with a markdown body', async () => {
   let entity = await readEntityView('/test');
   entityContext(entity);
   expect(markdownValue('body')).toBeDefined();
   expect(markdownValue('body')).toContain('<h1>Some title</h1>');
   expect(markdownValue('body')).toEqual(markdownItem('body').value);
   expect(markdownItem('body').urn).toBeDefined();
});

test('Test retrieving rendered template items', async () => {
    let entity = await readEntityView('/test');
    entityContext(entity);
    expect(templateValue('template')).toBeDefined();
    expect(templateValue('template')).toContain('Hello Template World!');
    expect(templateValue('template')).toEqual(templateItem('template').value);
    expect(templateItem('template').sortOrder).toEqual(0);
    expect(templateItem('template').urn).toBeDefined();
});

test('Test retrieving date time item', async () => {
   let entity = await readEntityView('/test');
   entityContext(entity);
   expect(dateTimeValue('birthday')).toBeDefined();
   expect(dateTimeValue('birthday')).toEqual('2025-06-11T00:00:00');
   expect(dateTimeValue('birthday')).toEqual(dateTimeItem('birthday').value);
});

test('Test retrieving a double value item', async () => {
   let entity = await readEntityView('/test');
   entityContext(entity);
   expect(doubleValue('pi')).toBeDefined();
   expect(doubleValue('pi')).toEqual(3.14);
   expect(doubleValue('pi')).toEqual(doubleItem('pi').value);
});

test('Test retrieving boolean value item', async () => {
    let entity = await readEntityView('/test');
    entityContext(entity);
    expect(booleanValue('tested')).toBeDefined();
    expect(booleanValue('tested')).toEqual(true);
    expect(booleanValue('tested')).toEqual(booleanItem('tested').value);
});

test('Test retrieving long integer value item', async () => {
   let entity = await readEntityView('/test');
   entityContext(entity);
   expect(longValue('max')).toBeDefined();
   expect(longValue('max')).toEqual(9223372036854775807);
   expect(longValue('max')).toEqual(longItem('max').value);
});

test('Test retrieving latitude longitude value item', async () => {
    let entity = await readEntityView('/test');
    entityContext(entity);
    expect(latitudeValue('goog')).toBeDefined();
    expect(latitudeValue('goog')).toEqual(51.49491442751952);
    expect(longitudeValue('goog')).toEqual(-0.146478288356193);
    expect(longitudeValue('goog')).toBeDefined();
    expect(latitudeValue('goog')).toEqual(latLongItem('goog').latitude);
    expect(longitudeValue('goog')).toEqual(latLongItem('goog').longitude);
});



