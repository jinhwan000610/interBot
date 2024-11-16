import axios from 'axios';

// OpenAI API 설정
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = ''; 

if (!OPENAI_API_KEY) {
  throw new Error('API Key is missing. Please set the OPENAI_API_KEY in your code.');
}

// GPT-3.5를 사용하여 직종에 맞는 면접 질문을 생성하는 함수
export const fetchInterviewQuestions = async (job: string): Promise<string[]> => {
  try {
    console.log('API 요청 시작');
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `사용자가 ${job} 직무 면접을 봅니다. 해당 직무에 맞는 5개의 면접 질문을 생성해 주세요.`,
          },
          {
            role: 'system',
            content: '응답은 항상 5개의 질문 형식으로 구체적이고 명확하게 작성해 주세요.',
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    console.log('API 응답 수신:', response.data);

    // 응답을 받아와서 질문 배열로 변환합니다
    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error('OpenAI 응답이 유효하지 않습니다.');
    }

    const rawResponse = response.data.choices[0].message.content.trim();
    const questions = rawResponse.split('\n').map((q: string) => q.trim());
    return questions; // 문자열 배열 반환
  } catch (error) {
    console.error('Error fetching interview questions:', error);
    throw error;
  }
};

// GPT-3.5를 사용하여 면접 응답을 평가하는 함수 추가
export const fetchInterviewEvaluation = async (job: string, responses: string[]): Promise<string> => {
  try {
    // 응답을 요청하기 위한 메시지 작성
    const responseContent = responses.map((response, index) => `질문 ${index + 2}: ${response}`).join('\n');
    const prompt = `
    다음은 ${job} 직무 면접에 대한 응답입니다:
    ${responseContent}

    각 질문에 대해 다음 형식으로 구체적으로 피드백을 작성해 주세요:
    - 질문 1에 대한 응답: (피드백)
    - 질문 2에 대한 응답: (피드백)
    - 질문 3에 대한 응답: (피드백)
    - 질문 4에 대한 응답: (피드백)
    - 질문 5에 대한 응답: (피드백)

    피드백은 반드시 모든 질문에 대해 작성해야 하며, 각 피드백은 질문에 대한 구체적인 개선 방안을 포함해야 합니다. 모든 질문에 대한 피드백이 있어야 합니다.

    마지막으로 최종 결론을 작성해 주세요.
    - 최종 결론: 합격 또는 불합격
    `;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: prompt },
        ],
        max_tokens: 3000, // 최대 토큰 수 증가
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    console.log('평가 결과 수신:', response.data);

    // 응답을 받아와서 평가 결과를 반환
    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error('OpenAI 응답이 유효하지 않습니다.');
    }

    const evaluationResult = response.data.choices[0].message.content.trim();
    return evaluationResult; // GPT의 평가 결과 반환
  } catch (error) {
    console.error('Error fetching interview evaluation:', error);
    throw error;
  }
};
