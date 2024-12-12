import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
        <MeetupDetail
            title={props.meetupData.title}
            image={props.meetupData.image}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
}

export async function getStaticPaths() {
    const client =await MongoClient.connect('mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db=client.db();
    const meetupsCollection=db.collection('meetups');
    const meetups =await meetupsCollection.find({},{_id:1}).toArray();
    client.close();
    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: { 
                meetupId: meetup._id.toString()
            },
        })),
    };
}
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId)
    });
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
                address: selectedMeetup.address


            },
        }
    };
}   

export default MeetupDetails;