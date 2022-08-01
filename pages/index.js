//out-domain.com
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head'

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First meetup',
        image: 'https://img.freepik.com/free-vector/building-concept-illustration_114360-4469.jpg?w=2000',
        address: 'some address 22, Ho Chi Minh city',
        discription: 'this is a once meetup'
    },
    {
        id: 'm2',
        title: 'A Second meetup',
        image: 'https://img.freepik.com/free-vector/city-skyline-concept-illustration_114360-8923.jpg?w=2000',
        address: 'some address 3338, Ho Chi Minh city',
        discription: 'this is a Second meetup'
    }
]

function HomePage(props) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="brower a huge list of highly active react Meetups"></meta>
            </Head>
            <MeetupList meetups={props.meetups}></MeetupList>
        </>
    )
}

// export async function getServerSideProps(context) {

//     const req = context.req;
//     const res = context.res;

//     //fetch data from API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    //fetch data from API

    const client = await MongoClient.connect(
        "mongodb+srv://nextjs-course:123456789Dai@cluster0.npu3i.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage
