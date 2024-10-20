import './listpage.css';
import {listData} from '../Lib/dummydata';
import Card from '../Card/Card';
import Filter from '../Filter/Filter';
import Map from '../Map/Map';



// Define the type for each item in the list data
interface SinglePost {
    id: number;
    title: string;
    img: string;
    bedRooms: number;
    bathRooms: number;
    price: number;
    address: string;
    latitude: number;
    longitude: number;
}
type ListItem = SinglePost;

const ListPage: React.FC = () => {
    const data: ListItem[] = listData; // Ensure data conforms to the ListItem type

    return (
        <div className="listPage">
            <Filter/>
            <div className="listContainer">
                <div className="wrapper1">
                    {data.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <div className="mapContainer">
            <Map items={data} />

            </div>
        </div>
    );
};

export default ListPage;
