import { Router } from 'express'
import { parseISO } from 'date-fns'; //trabalhar com datas

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//Rota: receber a requisição, chamar outro arquivo e devolver a resposta

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    //o que vem dentro do request.body não precisa definir o tipo

    const parsedDate = parseISO(date);

    const CreateAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = CreateAppointment.execute({
      date: parsedDate,
      provider
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export default appointmentsRouter;
