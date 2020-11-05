import StartTime from '../../models/Jobs/StartTime';

export const START_TIMES = [
    new StartTime(1, 'Today'),
    new StartTime(2, 'Tomorrow'),
    new StartTime(3, 'Within a week'),
    new StartTime(4, 'Within 2 weeks'),
    new StartTime(5, 'Within a month'),
    new StartTime(6, 'Flexible'),
]