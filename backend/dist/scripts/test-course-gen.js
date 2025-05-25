import { generateCourseContent } from '../src/utils/promptEngine.js';
import * as dotenv from 'dotenv';
async function testCourseGeneration() {
    try {
        const topic = 'Introduction to TypeScript';
        console.log(`Testing course generation for: ${topic}`);
        const startTime = Date.now();
        const content = await generateCourseContent(topic);
        const duration = (Date.now() - startTime) / 1000;
        console.log('\n✅ Course generated successfully!');
        console.log(`⏱️  Took ${duration.toFixed(2)} seconds`);
        console.log('\nGenerated content:');
        console.log('-----------------');
        console.log(content.substring(0, 500) + '...'); // Show first 500 chars
    }
    catch (error) {
        console.error('\n❌ Error generating course:');
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
    }
}
// Load environment variables
dotenv.config();
// Check for required environment variables
if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY environment variable is not set');
    console.log('\nPlease create a .env file in the backend directory with:');
    console.log('OPENAI_API_KEY=your_openai_api_key_here\n');
    process.exit(1);
}
console.log('🚀 Starting course generation test...');
testCourseGeneration();
