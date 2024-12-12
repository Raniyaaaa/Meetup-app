import MeetupDetail from "../../components/meetups/MeetupDetail";
import { DUMMY_MEETUPS } from "../index";
function MeetupDetails(props) {
    const { title, image, address, description } = props.meetupData;

    return (
        <MeetupDetail
            title={title}
            image={image}
            address={address}
            description={description}
        />
    );
}

export async function getStaticPaths() {
    return {
        fallback: true,
        paths: [
            { params: { meetupId: 'm1' } },
            { params: { meetupId: 'm2' } },
            { params: { meetupId: 'm3' } }
        ]
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const selectedMeetup = DUMMY_MEETUPS.find((meetup) => meetup.id === meetupId);

    if (!selectedMeetup) {
        return { notFound: true };
    }

    return {
        props: {
            meetupData: selectedMeetup
        },
        revalidate: 1
    };
}

export default MeetupDetails;
