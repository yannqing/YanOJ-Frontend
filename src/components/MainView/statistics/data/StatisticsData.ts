import { reactive } from 'vue'

export const trendingColumns = [
  {
    title: 'Title',
    dataIndex: 'name'
  },
  {
    title: 'Price',
    slotName: 'price'
  },
  {
    title: 'Chart',
    dataIndex: 'salary'
  }
]
export const trendingData = reactive([
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000
  },
  {
    key: '4',
    name: 'Kevin Sandra',
    salary: 22000
  },
  {
    key: '5',
    name: 'Kevin Sandra',
    salary: 22000
  }
])
