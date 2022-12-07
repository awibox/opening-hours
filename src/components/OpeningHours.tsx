import React, {useEffect, useState} from 'react';
import {daysOfWeek, getDayFromMonday, toUSAFormat} from '../utils';
import './OpeningHours.css';

// Types
type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type OpeningHoursItemData = {
  type: string,
  value: number
}

type OpeningHoursItem = OpeningHoursItemData[] | []

type ItemOfArrayType = {
  name: string,
  value: string,
  today: boolean,
}

type Props = {
  data: Record<DaysOfWeek, OpeningHoursItem>
}

// Component
const OpeningHours = ({data}: Props) => {
  const [items, setItems] = useState<ItemOfArrayType[]>([])
  // Getting a string with the opening hours. Time complexity O(n).
  const getOpeningHoursString = (item: OpeningHoursItem): string => {
    if (item.length > 0) {
      // Sorting in case the time entries are in the wrong order
      const sortedItems = [...item].sort((a, b) => (a.value - b.value));
      // Support of the case with the work of the restaurant until the next day
      sortedItems.push({type: "close", value: 3600})
      // Solution with using a flags to improve performance from O(n^2) to O(n)
      const resultArray = [];
      let open = 0;
      for (let i = 0; i < sortedItems.length; i++) {
        if (sortedItems[i].type === 'open') {
          open = sortedItems[i].value
        } else {
          if (open) {
            resultArray.push(
              `${toUSAFormat(open / 60 / 60)} - ${toUSAFormat(sortedItems[i].value / 60 / 60)}`
            );
            open = 0
          }
        }
      }
      return resultArray.length > 0 ? resultArray.join('\r\n') : '';
    }
    return '';
  }
  // Generating a new array for rendering when data changes. Time complexity O(n).
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
    setItems(itemsArray);
  }, [data])
  return (
    <div className="OpeningHours">
      <div className="OpeningHoursTitle">
        <div className="OpeningHoursTitleIcon"/>
        Opening hours
      </div>
      <div className="OpeningHoursItems">
        {items.map((item) => (
          <div key={item.name} className="OpeningHoursItem">
            <div className="OpeningHoursItemDay">
              {item.name}
              {item.today && <div className="OpeningHoursItemToday">
                today
              </div>}
            </div>
            <div className="OpeningHoursItemHours">
              {item.value ? item.value : <div className="OpeningHoursItemClosed">
                Closed
              </div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpeningHours;
