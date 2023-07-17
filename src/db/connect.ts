import mongoose from 'mongoose';
import variable from '../config';

const connect = async (): Promise<void> => {
	try {
		await mongoose.connect(variable.dataBaseUrl as string);
		console.log('Database connection established');
	} catch (error) {
		console.log(`Database connection: ${error as string}`);
	}
};

export default connect;
