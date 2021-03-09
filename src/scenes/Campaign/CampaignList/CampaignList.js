import { CircularProgress, IconButton, Paper } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import { EnhancedTable } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { paths } from 'routes';
import { CampaignActioner } from 'services/campaign';

function CampaignTable({ campaignFound, intlData }) {
  const [data] = useState(useMemo(() => campaignFound, [campaignFound]));
  const [skipPageReset] = useState(false);
  const history = useHistory();

  const intl = intlData.messages.scenes.campaignList;
  const commonDefaultTitles = intlData.messages.scenes.Table;
  const columnTitles = intl.columnTitles;

  const columns = useMemo(
    () => [
      {
        Header: columnTitles.name,
        accessor: 'name',
      },
      {
        Header: columnTitles.description,
        accessor: 'description',
      },
      {
        Header: commonDefaultTitles.actions,
        accessor: '_id',
        disableSortBy: true,
        Cell: ({ value }) => (
          <IconButton size="small" component={Link} to={paths.front.campaignEdit.replace(':id', value)}>
            <Edit />
          </IconButton>
        ),
      },
    ],
    [columnTitles.description, columnTitles.name, commonDefaultTitles.actions],
  );

  const actions = [
    {
      render: () => (
        <IconButton size="small" onClick={() => history.push(paths.front.campaignCreate)}>
          <AddCircle color="primary" />
        </IconButton>
      ),
      isFreeAction: true,
    },
  ];

  return (
    <EnhancedTable title={intl.title} columns={columns} data={data} actions={actions} skipPageReset={skipPageReset} />
  );
}

function CampaignListComponent(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      CampaignActioner.list().then(docs => {
        setCampaigns(docs);
        setLoading(false);
      });
    }
    return () => {};
  }, [loading]);

  return (
    <Paper>
      {loading ? (
        <div>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <CampaignTable campaignFound={campaigns} intlData={props.intl} reload={() => setLoading(true)} />
      )}
    </Paper>
  );
}

const CampaignList = injectIntl(CampaignListComponent);

export { CampaignList };
