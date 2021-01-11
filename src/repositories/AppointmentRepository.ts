import Appointment from '../../src/models/Appointment' // criar as interfaces como classes em models
import { isEqual } from 'date-fns'; //trabalhar com datas

//Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointments: Appointment[];
  constructor() {
    this.appointments = []
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null { // condicao ou nulo
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointment || null; //(else)
  }

  //estrutura de parametos nomeados
  public create({ provider, date }: CreateAppointmentDTO): Appointment { //Colocar o tipo da saída aqui. A
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
