import { request, response, Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'; //trabalhar com datas
import AppointmentRepository from '../repositories/AppointmentRepository'

const appointmentesRouter = Router();
//declaracao da variavel - typescript
const appointmentRepository = new AppointmentRepository();

//Rota: receber a requisição, chamar outro arquivo e devolver a resposta

appointmentesRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
});

appointmentesRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  //o que vem dentro do request.body não precisa definir o tipo

  const parsedDate = parseISO(date);
  const appointmentDate = startOfHour(parsedDate); //regra de negocio.. grava de hora em hora


  const findAppointmentInSameDate = appointmentRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is alredy booked!' });
  }

  const appointment = appointmentRepository.create({
    provider,
    date: appointmentDate,
  })

  return response.json(appointment);
});

export default appointmentesRouter;
