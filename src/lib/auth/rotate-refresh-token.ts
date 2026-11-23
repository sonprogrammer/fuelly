import { redis } from "@/lib/redis";
import { redisKeys } from "@/lib/redis-keys";

const ROTATE_SCRIPT = `
  local current = redis.call("GET", KEYS[1])
  if not current then
    return "INVALID"
  end

  local session = cjson.decode(current)

  if session.userId ~= ARGV[1] then
    return "INVALID"
  end

  local previous = redis.call("GET", KEYS[2])

  if previous then
    local record = cjson.decode(previous)

    if record.oldTokenHash ~= ARGV[2] then
      return "INVALID"
    end

    if session.tokenHash ~= record.newTokenHash then
    return "INVALID"
  end

    return record.encryptedToken
  end

  if session.tokenHash ~= ARGV[2] then
    return "INVALID"
  end

  if redis.call("TTL", KEYS[1]) <= 0 then
    return "INVALID"
  end

  session.tokenHash = ARGV[3]
  redis.call("SET", KEYS[1], cjson.encode(session), "KEEPTTL")
  redis.call("SET", KEYS[2], cjson.encode({
    oldTokenHash = ARGV[2],
    newTokenHash = ARGV[3],
    encryptedToken = ARGV[4]
  }), "EX", 30)
  return "SUCCESS"
`;

export async function rotateRefreshToken(
  sessionId: string,
  userId: string,
  requestId: string,
  oldTokenHash: string,
  newTokenHash: string,
  encryptedToken: string
) {
  return redis.eval(
    ROTATE_SCRIPT,
    [
      redisKeys.session(sessionId),
      redisKeys.refreshRequest(sessionId, requestId)
    ],
    [userId, oldTokenHash, newTokenHash, encryptedToken]
  ) as Promise<string>;
}