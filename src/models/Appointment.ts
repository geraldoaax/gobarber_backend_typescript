import { uuid } from 'uuidv4'; //unico id


class Appointment {
  id: string;

  provider: string;

  date: Date;
  //omit passa as variaves mas exclui um.. no caso o ID
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;

