/// <reference types="node" />
import { generateCourseContent } from '../src/utils/promptEngine.js';
async function testCourseGeneration() {
    try {
        console.log('🚀 Testing course generation with Mistral 7B...');
        const topic = 'Introduction to TypeScript';
        console.log(`\n📝 Topic: ${topic}`);
        console.log('⏳ Generating content...\n');
        const startTime = Date.now();
        const content = await generateCourseContent(topic);
        const duration = (Date.now() - startTime) / 1000;
        console.log('✅ Course generated successfully!');
        console.log(`⏱️  Took ${duration.toFixed(2)} seconds`);
        console.log('\nGenerated content:');
        console.log('-----------------');
        console.log(content);
    }
    catch (error) {
        console.error('\n❌ Error generating course:');
        console.error(error instanceof Error ? error.message : error);
        process.exit(1);
    }
}
// Run the test
testCourseGeneration();
