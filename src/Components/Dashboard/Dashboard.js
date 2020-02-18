import React from "react";
import { Column } from 'rbx';
import InfoBox from './InfoBox';

const Dashboard = ({ country }) => {
  const testData = [
    {
      title: 'Weather',
      contents: (
        <React.Fragment>
          <Column.Group breakpoint="mobile">
            <Column size={8}>
              <p>Daytime Hi: 74</p>
              <p>Daytime Lo: 57</p>
            </Column>
            <Column size={4}>
              <h2>68 &deg;F</h2>
              <p>light rain</p>
            </Column>
          </Column.Group>
        </React.Fragment>
      )
    },
    {
      title: 'Travel Warnings',
      contents: (
        <React.Fragment>
          <p>
            Exercise increased caution in Costa Rica due to crime. (Jan 7, 2020)
          </p>
          <p>
            Outbreak alert: There is a dengue outbreak in Costa Rica. Dengue is
            spread by mosquitoes. Travelers going to Costa Rica should take steps
            to avoid mosquito bites. (Aug 27, 2019)
          </p>
        </React.Fragment>
      )
    },
    {
      title: 'Visa Requirements',
      contents: (
        <p>
          Not required for stays less than 90 days, but return ticket required.
        </p>
      )
    },
    {
      title: 'Vaccinations',
      contents: (
        <p>
          Proof of yellow fever vaccination must be presented upon arrival for all
          passengers coming from certain countries in South America or Africa
        </p>
      )
    },
    {
      title: 'Plug Type',
      contents: (
        <p>
          A/B type plug, 120v (USA standard electrical system)
        </p>
      )
    },
  ];

  return (
    <React.Fragment>
      {testData.map( data => (    
        <InfoBox
          key={data.title}
          title={data.title}
          contents={data.contents}
        />))
      }
    </React.Fragment>
  )
}

export default Dashboard;
