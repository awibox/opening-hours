import React, {useEffect, useState} from 'react';
import './OpeningHours.css';

// Utils
const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const getDayFromMonday = (): number => {
  const currentDay = new Date().getDay();
  return currentDay === 0 ? 6 : currentDay - 1;
}

const toUSAFormat = (hours: number): string => {
  let h = hours % 12;
  if (h === 0) h = 12;
  return h + (hours < 12 ? ' AM' : ' PM');
}

// Types
type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type OpeningHoursItemData = {
  type: string,
  value: number
}

type OpeningHoursItem = OpeningHoursItemData[] | []

type Props = {
  data: Record<DaysOfWeek, OpeningHoursItem>
}

type ItemOfArrayType = {
  name: string,
  value: string,
  today: boolean,
}

// Component
const OpeningHours = ({data}: Props) => {
  console.log('data', data)
  const [items, setItems] = useState([])
  const getOpeningHoursString = (item: OpeningHoursItem): string => {
    if (item.length > 0) {
      const sortedItems = [...item].sort((a, b) => (a.value - b.value));
      sortedItems.push({type: "close", value: 3600})
      console.log('sortedItems', sortedItems)
      const resultArray = [];
      let open = 0;
      for (let i = 0; i < sortedItems.length; i++) {
        if (sortedItems[i].type === 'open') {
          open = sortedItems[i].value
        } else {
          if (open) {
            resultArray.push(
              `${toUSAFormat(open / 60 / 60)} - ${toUSAFormat(sortedItems[i].value / 60/ 60)}`
            );
            open = 0
          }
        }
      }
      console.log('resultArray', resultArray)
      return resultArray.length > 0 ? resultArray.join(', ') : 'Closed';
    }
    return 'Closed';
  }
  useEffect(() => {
    const itemsArray: ItemOfArrayType[] = [];
    let k: keyof typeof data;
    for (k in data) {
      itemsArray.splice(daysOfWeek.indexOf(k), 0, {
        name: k,
        value: getOpeningHoursString(data[k]),
        today: daysOfWeek.indexOf(k) === getDayFromMonday()
      })
    }
    console.log('itemsArray', itemsArray)
  }, [data])
  return (
    <div className="App">
      test
    </div>
  );
}

export default OpeningHours;
