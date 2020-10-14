import React from "react";
import "./reports.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";

import { Sidebar } from "../../templates/navigation";

const Reports = (props) => {
  const { match } = props;

  const meta = {
    title: `${process.env.REACT_APP_BRAND} - Your Web Solution`,
    description: `${process.env.REACT_APP_BRAND} is the solution for all your needs`,
    meta: {
      name: {
        robots: "noindex,nofollow",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <Layout>
        <div className="content">
          <div className="content__withSidebar">
            <Sidebar pageParams={match.params.book} />
            <div className="main">
              <h1>Ini Record {match.params.book} reports</h1>
            </div>
          </div>
        </div>
      </Layout>
    </DocumentMeta>
  );
};

export default Reports;
