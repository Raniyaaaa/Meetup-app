import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();

    client.close();

    return {
      fallback: 'blocking',
      paths: meetups.map((meetup) => ({
        params: { meetupId: meetup._id.toString() },
      })),
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return { fallback: 'blocking', paths: [] };
  }
}


export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  try {
    const client = await MongoClient.connect(
      'mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({
      _id: new ObjectId(meetupId),
    });

    client.close();

    return {
      props: {
        meetupData: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          address: selectedMeetup.address,
          image: selectedMeetup.image,
          description: selectedMeetup.description,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching meetup data:', error);
    return {
      props: { meetupData: null },
    };
  }
}

export default MeetupDetails;
