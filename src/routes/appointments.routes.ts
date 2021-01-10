import { request, response, Router } from 'express'
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual, parse } from 'date-fns';
import Appointment from '../../src/models/Appointment'

const appointmentesRouter = Router();
//declaracao da variavel - typescript
const appointments: Appointment[] = [] //seta que a colecao appointments e do tipo

appointmentesRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is alredy booked!' });
  }

  const appointment = new Appointment(provider, date);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentesRouter;
