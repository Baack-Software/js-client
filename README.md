# Baack Javascript content client
Baack headless content management Javascript (ES6) client module for content and digital experiences.

This client provides helper functionality for Javascript developers to easily integrate content managed on Baack into their sites.

## Usage
In order to use the JS content client an account and API client details are required. These can be set up on the [Baack](https://www.baack.co/) website.

The current client uses a context scoped content [Entity](https://www.baack.co/doc/n/object/entity) for accessing content items of the various types supported by the platform.

This client currently supports:

* [Text](https://www.baack.co/doc/n/object/textitem) for basic content string values.
* [Markdown](https://www.baack.co/doc/n/object/markdownitem) for markdown rendered content. The un-rendered markdown can be updated using the separate management API. Baack currently supports common-mark format.
* [Templates](https://www.baack.co/doc/n/object/templateitem) to allow dynamic rendering in the context of the content being returned. This can be useful for composing components rather than content items.
* [Date/Time](https://www.baack.co/doc/n/object/datetimeitem) for representing a timestamp with millisecond accuracy. Note that values are currently always UTC / Z without zone information.
* [Double precision floating point numbers](https://www.baack.co/doc/n/object/doubleitem) for storing floating point values which are stored using double precision (64 bit) values.
* [Boolean](https://www.baack.co/doc/n/object/booleanitem) truthy values which can be used for logic in templates or configuring user experience or default form input values.
* [Image](https://www.baack.co/doc/n/object/imageitem) for images with support for 3 separate size formats for images to offer either device or browser src set style selection of asset sizing.
* [Long integer](https://www.baack.co/doc/n/object/longitem) values for representing large (64bit) integer values. The JSON encoding to strings is handled automatically on rendering for values larger than suppored in JS.
* [Latitude / longitude](https://www.baack.co/doc/n/object/latlongitem) for representing geographical positions. Note that all content items include a `sortOrder` value which can be used to create a multi point sequence for a bounding box for example.

The general usage of the client is to use entities for page like responses (there are no directories), this means when accessing the homepage content for a web experience you are rendering a `index` or `home` file rather than the OS filesystem.

To give an example of the usage for a very simple React app you may include the content and use the short-hand helper functions to access the content items:

```
import {    
    readEntityView,
    textValue, // Text value shorthand function
    markdownValue // Markdown value shorthand function
} from baack-client;

export default function MyApp() {
  let entity = await readEntityView('/home');
  entityContext(entity);
  return (
    <h1>{textValue('title')}</h1>
    <div>
      {markdownValue('body')}      
    </div>
  );
}


```

Baack content items use a sparse matrix approach to their naming with name / sortOrder (number) to allow reprsenting tabular data. You could also use the same concept to build lists of components in your UI. Let's say you wanted to have a markdown content section with multiple sections in a page you could create multiple `section` markdown items and use the `sortOrder` to create multiple sections.

```
  return (
    <Section content={mv('section', 0)} />
    <Section conetnt={mv('section', 1)} />
  );
```


### Setup
The client currently uses two environment variables to configure it's usage. These are set via the config from the `process.env.BAACK_HOSTNAME` and `process.env.BAACK_API_BEARER` environment variables.

For a full list of APIs available see the reference docs on the [Baack API documentation site](https://www.baack.co/doc/n/).

### Feedback

The clients are currently under active development and we welcome feedback or feature requests via the github repo.
