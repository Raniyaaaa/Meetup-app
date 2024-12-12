import MeetupDetail from "../../components/meetups/MeetupDetail";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 5, 12345 Some City',
        description: "This is a first meetup!"
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 10, 12345 Some City',
        description: "This is a second meetup!"
    },
    {
        id: 'm3',
        title: 'A Third Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 15, 12345 Some City',
        description: "This is a third meetup!"
    }
];
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
