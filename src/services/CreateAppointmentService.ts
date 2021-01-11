import Appointment from '../models/Appointment';
import { startOfHour } from 'date-fns'; //trabalhar com datas
import AppointmentsRepository from '../repositories/AppointmentsRepository';

//Recebimento das Informações
interface Request { //request para receber dados (DTO)
  provider: string;
  date: Date;
}

class CreateAppointmentService {

  private appointmentsRepository: AppointmentsRepository //Dependeny Invertion

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date); //regra de negocio.. grava de hora em hora

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate,);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is alredy booked!')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })

    return appointment;

  }

}

export default CreateAppointmentService;
