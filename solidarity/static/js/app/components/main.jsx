// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { I18n } from 'react-redux-i18n';

import Comment from '../graphql/queries/Comment.graphql';

type Props = {
  data: {
    loading: boolean,
    comment: string
  }
};

export const DumbMain = ({ data }: Props) => {
  if (data.loading) return 'Loading...';
  return (
    <div className="container">
      <strong>{I18n.t('message')}</strong>
      {`: ${data.comment}`}
    </div>
  );
};

export default graphql(Comment)(DumbMain);