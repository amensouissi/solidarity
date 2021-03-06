/* eslint-disable no-param-reassign, import/no-unresolved, import/extensions */
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { RetryLink } from 'apollo-link-retry';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { persistCache } from 'apollo-cache-persist';
import { toIdValue } from 'apollo-utilities';

let urlMetadataWebServiceUrl;

if (window.location.port) {
  // if we have a port defined, we are in development mode
  urlMetadataWebServiceUrl = `${window.location.protocol}//${window.location.hostname}:5000`; // http://localhost:5000
} else {
  urlMetadataWebServiceUrl = `${window.location.protocol}//${window.location.hostname}/urlmetadata`;
}

const dataIdFromObject = (o) => {
  return o.id;
};

const cache = new InMemoryCache({
  dataIdFromObject: dataIdFromObject,
  cacheResolvers: {
    Query: {
      node: (_, args) => {
        return toIdValue(dataIdFromObject({ id: args.id }));
      }
    }
  }
});

// persistCache({
//   cache: cache,
//   storage: window.localStorage
// });

export default function getApolloClient() {
  // use the instane url
  const customFetch = (uri, options) => {
    return fetch(`${window.location.origin}/graphql`, options);
  };
  const primaryLink = createUploadLink({
    uri: '/graphql',
    fetch: customFetch
  });

  // use the url_metadata ws url
  const customFetchURLMetadta = (uri, options) => {
    return fetch(`${urlMetadataWebServiceUrl}/graphql`, options);
  };
  const urlMetadtaLink = createUploadLink({
    uri: '/graphql',
    fetch: customFetchURLMetadta
  });

  const link = new RetryLink().split(
    (operation) => {
      return operation.operationName !== 'URLMetadata';
    },
    primaryLink,
    urlMetadtaLink
  );

  // add the authorization to the headers
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
      return {
        headers: {
          ...headers,
          'X-Api-Key': null // store.getState().user.token || null
        }
      };
    });
    return forward(operation);
  });

  return new ApolloClient({
    link: concat(authMiddleware, link),
    cache: cache
  });
}