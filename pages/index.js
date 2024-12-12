import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
    return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
    try {
        const response = await fetch(
            'http://localhost:3000/api/new-meetup',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await response.json();

        return {
            props: {
                meetups: data.meetups.map((meetup) => ({
                    id: meetup._id.toString(),
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    description: meetup.description,
                })),
            },
            revalidate: 1,
        };
    } catch (error) {
        console.error('Error fetching meetups:', error);
        return {
            props: {
                meetups: [],
            },
        };
    }
}

export default HomePage;
