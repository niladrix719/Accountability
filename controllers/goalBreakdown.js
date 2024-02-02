async function goalBreakdown(goal) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Break down the goal: ${goal}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const subGoals = response.data.choices.map((choice) => {
      const subGoal = {
        name: choice.text,
        description: 'Sub-goal description',
        status: 'Pending',
        deadline: new Date().toISOString(),
        assignments: [
          {
            name: 'Assignment name',
            description: 'Assignment description',
            status: 'Pending',
            deadline: new Date().toISOString(),
            assignee: 1,
          },
        ],
      };

      return subGoal;
    });

    return subGoals;
  } catch (error) {
    console.error('Error processing goal with GPT:', error.message);
    throw error;
  }
}
