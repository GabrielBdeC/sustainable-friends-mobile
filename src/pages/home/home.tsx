import { ItemDto } from "../../shared/models/item.dto";
import { ItemService } from "../../shared/services/item.service";
import "./home.css";


const itemService = new ItemService();
itemService.getAll().then((item: ItemDto) => {
  console.log(item);
});

export const Home = () => {
  return (    
    <div>Home works!</div>
    // Code here
  );
};
