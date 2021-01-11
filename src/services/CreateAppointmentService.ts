import Appointment from '../models/Appointment';
import { startOfHour, parseISO } from 'date-fns'; //trabalhar com datas

//Recebimento das Informações
interface Request { //request para receber dados (DTO)
  provider: string;
  date: Date;
}
//Tratativa de Erros e Exceções
//Acesso ao repositório

class CreateAppointmentService {
  public execute({ date, provider }): Appointment {
    const appointmentDate = startOfHour(parsedDate); //regra de negocio.. grava de hora em hora


    const findAppointmentInSameDate = appointmentRepository.findByDate(parsedDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is alredy booked!')
    }

    const appointment = appointmentRepository.create({
      provider,
      date: appointmentDate,
    })

    return Appointment

  }

}

export default CreateAppointmentService;
