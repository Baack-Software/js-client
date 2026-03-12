import {
    CONFIG as baackConfig,
    readEntityView,
    tv, textItem,
    mv, markdownItem,
    vv, templateItem,
    zv, dateTimeItem,
    dv, doubleItem,
    bv, booleanItem,
    imageItem,
    lv, longItem,
    latv, longv, latLongItem,
    entityContext,
} from '../src/index.js';


test('Test fetching home page content entity', async () => {
    let entity = await readEntityView('/test');
    expect(entity).toBeDefined();
    expect(entity.name).toBeDefined();
    expect(entity.variant).toEqual('');
    expect(entity.language).toEqual('en-GB');
    entityContext(entity);
    expect(tv('title')).toBeDefined();
    expect(tv('title')).not.toEqual('');

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
    expect(tv('title')).toEqual('');
});

test('Test reading undefined value returns empty', async () => {
   let entity = await readEntityView('/test');
   entityContext(entity);
   expect(tv('unknown_value')).toEqual('');
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
   expect(mv('body')).toBeDefined();
   expect(mv('body')).toContain('<h1>Some title</h1>');
   expect(mv('body')).toEqual(markdownItem('body').value);
   expect(markdownItem('body').urn).toBeDefined();
});

test('Test retrieving rendered template items', async () => {
    let entity = await readEntityView('/test');
    entityContext(entity);
    expect(vv('template')).toBeDefined();
    expect(vv('template')).toContain('Hello Template World!');
    expect(vv('template')).toEqual(templateItem('template').value);
    expect(templateItem('template').sortOrder).toEqual(0);
    expect(templateItem('template').urn).toBeDefined();
});

test('Test retrieving date time item', async () => {
   let entity = await readEntityView('/test');
   entityContext(entity);
   expect(zv('birthday')).toBeDefined();
   expect(zv('birthday')).toEqual('2025-06-11T00:00:00');
   expect(zv('birthday')).toEqual(dateTimeItem('birthday').value);
});

test('Test retrieving a double value item', async () => {
   let entity = await readEntityView('/test');
   entityContext(entity);
   expect(dv('pi')).toBeDefined();
   expect(dv('pi')).toEqual(3.14);
   expect(dv('pi')).toEqual(doubleItem('pi').value);
});

test('Test retrieving boolean value item', async () => {
    let entity = await readEntityView('/test');
    entityContext(entity);
    expect(bv('tested')).toBeDefined();
    expect(bv('tested')).toEqual(true);
    expect(bv('tested')).toEqual(booleanItem('tested').value);
});

test('Test retrieving long integer value item', async () => {
   let entity = await readEntityView('/test');
   entityContext(entity);
   expect(lv('max')).toBeDefined();
   expect(lv('max')).toEqual(9223372036854775807);
   expect(lv('max')).toEqual(longItem('max').value);
});

test('Test retrieving latitude longitude value item', async () => {
    let entity = await readEntityView('/test');
    entityContext(entity);
    expect(latv('goog')).toBeDefined();
    expect(latv('goog')).toEqual(51.49491442751952);
    expect(longv('goog')).toEqual(-0.146478288356193);
    expect(longv('goog')).toBeDefined();
    console.log(latLongItem('goog'));
    expect(latv('goog')).toEqual(latLongItem('goog').latitude);
    expect(longv('goog')).toEqual(latLongItem('goog').longitude);
});



