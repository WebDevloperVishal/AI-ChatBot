import { BadRequestException } from "../exceptions/bad-request.js";
import { ErrorCodes } from "../exceptions/root.js";
import { getEmbedding } from "../services/openai.js";
import { searchQdrant } from "../services/qdrant.js";
import openai from "../services/openai.js";
import { handleQuery } from "../agents/router.agent.js";

export const chatController = async (req, res, next) => {
  const { message } = req.body;

  if (!message) {
    return next(
      new BadRequestException(
        "message is required",
        ErrorCodes.MESSAGE_IS_REQUIRED
      )
    );
  }

  const result = await handleQuery(message);

  return res.status(200).json({
    message : result.answer,
    from_knowledge_base: result.from_knowledge_base ?? false,
    source : result.source ?? null,
    
  })

};