// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router';

import Pages from '../graphql/queries/Pages.graphql';

type Page = {
  id: string,
  title: string,
  body: string
};

type Props = {
  classes: Object,
  data: {
    loading: boolean,
    pages: Array<Page>
  },
  children: React.Node
};

type State = {
  value: number,
  hasError: boolean
};

type TabContainerProps = {
  children: Object
};

function TabContainer({ children }: TabContainerProps) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = {
  root: {
    flexGrow: 1,
    width: '100%'
  }
};

export class DumbMain extends React.Component<Props, State> {
  state = {
    value: 0,
    hasError: false
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  handleChange = (event: SyntheticEvent<HTMLButtonElement>, value: number) => {
    this.setState({ value: value });
  };

  render() {
    const { data, classes, children } = this.props;
    const { value, hasError } = this.state;
    if (data.loading) return 'Loading...';
    const currentPage = data.pages[value];
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            {data.pages.map((page: Page) => {
              return <Tab key={page.id} label={page.title} icon={<ThumbUp />} />;
            })}
          </Tabs>
        </AppBar>
        {currentPage ? (
          <TabContainer>
            <Link to="/page">
              <div dangerouslySetInnerHTML={{ __html: currentPage.body }} />
            </Link>
          </TabContainer>
        ) : null}
        {hasError ? 'Oups an error!' : children}
      </div>
    );
  }
}

// TODO use Query component instead of graphql
export default withStyles(styles)(graphql(Pages)(DumbMain));